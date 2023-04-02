from rest_framework import serializers

from .models import Board, Card, Task
from accounts.models import BoardUser


class CardSerializer(serializers.ModelSerializer):
    task = serializers.PrimaryKeyRelatedField(queryset=Task.objects.all(), required=False)
    text = serializers.CharField(required=False)
    order = serializers.IntegerField(required=False)

    class Meta:
        model = Card
        fields = ['id', 'completion', 'text', 'task', 'order']
        ordering = ['order']
    
    def update(self, instance, validated_data):
        new_order = validated_data.get('order')
        new_task = validated_data.get('task')
        new_completion = validated_data.get('completion')
        old_order = instance.order
        task = instance.task

        instance.order = new_order if "order" in validated_data else old_order
        instance.task_id = new_task if "task" in validated_data else task.id
        instance.completion = new_completion
        instance.save()

        if new_task != task.id and not "completion" in validated_data:
            instance.completion = ""
            instance.save() 
        if "order" in validated_data:
            cards_above = task.card_set.filter(order__gte=new_order).exclude(id=instance.id)
            for card in cards_above:
                card.order += 1
                card.save()

        return instance



class TaskSerializer(serializers.ModelSerializer):
    cards = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = ['id', 'prompt','cards']

    def create(self, validated_data):
        obj = Task.objects.create(**validated_data, board=Board.objects.get(created_by=self.context['request'].user))
        return obj

    def get_cards(self, task):
        cards = task.card_set.order_by('order')
        serializer = CardSerializer(cards, many=True)
        return serializer.data


class BoardSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, source="task_set")
    created_by = serializers.PrimaryKeyRelatedField(queryset=BoardUser.objects.all())

    class Meta:
        model = Board
        fields = ['id', 'tasks', 'created_by']

 