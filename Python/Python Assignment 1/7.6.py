class MyList:
    def __init__(self):
        self.data = []

    def __getitem__(self, index):
        return self.data[index]

    def __setitem__(self, index, value):
        self.data[index] = value

    def __len__(self):
        return len(self.data)

    def append(self, value):
        self.data.append(value)

# Usage
ml = MyList()
ml.append(10)
ml.append(20)
ml.append(30)
print(ml[1])    
print(len(ml))   
