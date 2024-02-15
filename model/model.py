# To install pytorch run the following type the following into a terminal
# pip3 install torch torchvision torchaudio
import torch

# Passes a random 5x3 matrix into torch model
model = torch.rand(5,3)
# Displays the model matrix
print(model)