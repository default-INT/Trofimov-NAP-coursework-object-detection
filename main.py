from PIL import Image
import matplotlib.pyplot as plt
import cv2

import numpy as np
import random

import torch
import torchvision
import torchvision.transforms as T


device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(device)

model = torchvision.models.detection.maskrcnn_resnet50_fpn(pretrained=True).to(device)
model.eval()

CATEGORIES_IDX = [1, 73]
CATEGORIES = ["person", "laptop"]


def get_prediction(img_path, threshold=0.92):
    img = T.Compose([T.ToTensor()])(Image.open(img_path))
    pred = model([img.to(device)])
    pred_score = list(pred[0]["scores"].cpu().detach().numpy())
    labels = list(pred[0]["labels"].cpu().detach().numpy())
    boxes = list(pred[0]["boxes"].cpu().detach().numpy())
    masks = list(pred[0]["masks"].cpu().detach().numpy())
    pred_t = [pred_score.index(x) for x in pred_score if x > threshold][-1]
    masks = (pred[0]['masks'] > threshold).squeeze().detach().cpu().numpy()
    masks = masks[:pred_t + 1]

    pred_class = []
    pred_boxes = []
    pred_masks = []
    for i, (label, box, mask) in enumerate(zip(labels, boxes, masks)):
        if pred_score[i] > threshold and label in CATEGORIES_IDX:
            pred_class.append(CATEGORIES[CATEGORIES_IDX.index(label)])
            pred_boxes.append([(box[0], box[1]), (box[2], box[3])])
            pred_masks.append(mask)
    return pred_boxes, pred_class, pred_score, masks


def random_colour_masks(image):
    colours = [[0, 255, 0], [0, 0, 255], [255, 0, 0], [0, 255, 255], [255, 255, 0], [255, 0, 255], [80, 70, 180],
               [250, 80, 190], [245, 145, 50], [70, 150, 250], [50, 190, 190]]
    r = np.zeros_like(image).astype(np.uint8)
    g = np.zeros_like(image).astype(np.uint8)
    b = np.zeros_like(image).astype(np.uint8)
    r[image == 1], g[image == 1], b[image == 1] = colours[random.randrange(0, 10)]
    coloured_mask = np.stack([r, g, b], axis=2)
    return coloured_mask


def detect_object_on_image(img_path):
    boxes, classes, scores, masks = get_prediction(img_path)
    img = cv2.cvtColor(cv2.imread(img_path), cv2.COLOR_BGR2RGB)
    for cls, box, score, mask in zip(classes, boxes, scores, masks):
        rgb_mask = random_colour_masks(mask)
        img = cv2.addWeighted(img, 1, rgb_mask, 0.5, 0)
        main_color = (0, 0, 255)
        if cls == 'laptop':
            main_color = (255, 0, 0)
        cv2.rectangle(img, box[0], box[1], color=main_color, thickness=2)
        cv2.putText(img, cls + " " + str(score), box[0], cv2.FONT_HERSHEY_SIMPLEX, 0.5, main_color, thickness=1)

    pil_img = Image.fromarray(img)
    pil_img.save('tmp/tmp_detected_img.jpg')
    # plt.figure(figsize=(20, 30))
    # plt.imshow(img)
    # plt.axis("off")
    # plt.show()


if __name__ == '__main__':
    detect_object_on_image(r"samples/sample10.jpg")
