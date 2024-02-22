class MovieDTO:
    def __init__(self, name, director, image):
        self.name = name
        self.director = director
        self.image = image
    def to_dict(self):
        return {
            "name": self.name,
            "director": self.director,
            "image": self.image
        }