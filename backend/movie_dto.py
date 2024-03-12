class MovieDTO:
    def __init__(self, name, director, image):
        self.name = name
        self.image = image
    def to_dict(self):
        return {
            "name": self.name,
            "image": self.image
        }