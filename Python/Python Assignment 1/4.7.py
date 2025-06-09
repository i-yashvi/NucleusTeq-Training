from collections import deque

class Queue:
    def __init__(self):
        self.q = deque()

    def enqueue(self, item):
        self.q.append(item)

    def dequeue(self):
        return self.q.popleft() if self.q else None

q = Queue()
q.enqueue(1)
print(q.dequeue())  