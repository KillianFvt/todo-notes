from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import NoteSerializer
from .models import Note


@api_view(['GET', 'POST'])
def api_root(request):
    return Response({"message": 'API Root'})


@api_view(['GET'])
def get_notes(request):
    notes = Note.objects.all().order_by('-updated')
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_note(request, note_pk):
    notes = Note.objects.get(id=note_pk)
    serializer = NoteSerializer(notes, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def update_note(request, note_pk):
    data = request.data
    note = Note.objects.get(id=note_pk)
    serializer = NoteSerializer(instance=note, data=data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def delete_note(request, note_pk):
    to_del_note = Note.objects.get(id=note_pk)
    to_del_note.delete()

    return Response({'message': 'Note successfully deleted'})


@api_view(['POST'])
def add_note(request):
    data = request.data
    note = Note.objects.create(
        body=data['body']
    )

    note.save()

    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)


