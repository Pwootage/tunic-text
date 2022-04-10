from PIL import Image, ImageDraw
import math
import numpy as np

SIDE_TOP_LEFT = 0b000000_000001
SIDE_TOP_RIGHT = 0b000000_000010
SIDE_RIGHT = 0b000000_000100
SIDE_BOTTOM_RIGHT = 0b000000_001000
SIDE_BOTTOM_LEFT = 0b000000_010000
SIDE_LEFT = 0b000000_100000
CORNER_TOP = 0b000001_000000
CORNER_TOP_RIGHT = 0b000010_000000
CORNER_BOTTOM_RIGHT = 0b000100_000000
CORNER_BOTTOM = 0b001000_000000
CORNER_BOTTOM_LEFT = 0b010000_000000
CORNER_TOP_LEFT = 0b100000_000000

def main():
    LETTER_SIZE = 20
    with Image.new("RGB", (LETTER_SIZE * 3, LETTER_SIZE * 3), "#FFFFFF") as im:
        draw = ImageDraw.Draw(im)
        char = 0b1111111_111111#SIDE_LEFT | SIDE_TOP_LEFT | CORNER_TOP | CORNER_TOP_RIGHT | SIDE_BOTTOM_LEFT | SIDE_BOTTOM_RIGHT | CORNER_BOTTOM_RIGHT
        drawTunicChar(draw, (LETTER_SIZE * 1.5, LETTER_SIZE * 1.5), LETTER_SIZE, char, 'tunic')
        im.save("test.png")

def drawTunicChar(draw, pos, size, config, mode):
    x, y = pos
    pos = np.array([x, y])
    top = np.array([0, -1]) * size + pos
    bottom = np.array([0, 1]) * size + pos
    top_left = np.array([-math.sqrt(3) / 2, -1 / 2]) * size + pos
    top_right = np.array([math.sqrt(3) / 2, -1 / 2]) * size + pos
    bottom_left = np.array([-math.sqrt(3) / 2, 1 / 2]) * size + pos
    bottom_right = np.array([math.sqrt(3) / 2, 1 / 2]) * size + pos
    center = np.array([0, 0]) * size + pos
    center_left = np.array([-math.sqrt(3) / 2, 0]) * size + pos
    center_right = np.array([math.sqrt(3) / 2, 0]) * size + pos

    gap = np.array([0, 0])
    if mode == 'tunic':
        gap = gap = np.array([0, 0.3 * size])

    # WORD LINE
    if mode == 'tunic':
        test = tuple(center_left) + tuple(center_right)
        draw.line(tuple(center_left) + tuple(center_right), fill="#000000", width=4)

    # OUTLINE
    if config & SIDE_TOP_LEFT:
        draw.line(tuple(top_left - gap) + tuple(top - gap), fill="#000000", width=4)
    if config & SIDE_TOP_RIGHT:
        draw.line(tuple(top_right - gap) + tuple(top - gap), fill="#000000", width=4)
    if config & SIDE_RIGHT:
        draw.line(tuple(top_right - gap) + tuple(center_right), fill="#000000", width=4)
        draw.line(tuple(center_right + gap) + tuple(bottom_right), fill="#000000", width=4)
    # if config & SIDE_BOTTOM_RIGHT:
    #     ctx.moveTo(x + bottom_right[0] * size, y + bottom_right[1] * size + gap)
    #     ctx.lineTo(x + bottom[0] * size, y + bottom[1] * size + gap)
    # if config & SIDE_BOTTOM_LEFT:
    #     ctx.moveTo(x + bottom_left[0] * size, y + bottom_left[1] * size + gap)
    #     ctx.lineTo(x + bottom[0] * size, y + bottom[1] * size + gap)
    # if config & SIDE_LEFT:
    #     ctx.moveTo(x + top_left[0] * size, y + top_left[1] * size - gap)
    #     ctx.lineTo(x + center_left[0] * size, y + center_left[1] * size)
    #     # gap
    #     ctx.moveTo(x + bottom_left[0] * size, y + bottom_left[1] * size + gap)
    #     ctx.lineTo(x + center_left[0] * size, y + center_left[1] * size + gap)


    # CENTER LINES
    # if config & CORNER_TOP:
    #     ctx.moveTo(x + center[0] * size, y + center[0] * size)
    #     ctx.lineTo(x + top[0] * size, y + top[1] * size - gap)
    # if config & CORNER_TOP_RIGHT:
    #     ctx.moveTo(x + center[0] * size, y + center[0] * size - gap)
    #     ctx.lineTo(x + top_right[0] * size, y + top_right[1] * size - gap)
    # if config & CORNER_BOTTOM_RIGHT:
    #     ctx.moveTo(x + center[0] * size, y + center[0] * size + gap)
    #     ctx.lineTo(x + bottom_right[0] * size, y + bottom_right[1] * size + gap)
    # if config & CORNER_BOTTOM:
    #     ctx.moveTo(x + center[0] * size, y + center[0] * size + gap)
    #     ctx.lineTo(x + bottom[0] * size, y + bottom[1] * size + gap)
    # if config & CORNER_BOTTOM_LEFT:
    #     ctx.moveTo(x + center[0] * size, y + center[0] * size + gap)
    #     ctx.lineTo(x + bottom_left[0] * size, y + bottom_left[1] * size + gap)
    # if config & CORNER_TOP_LEFT:
    #     ctx.moveTo(x + center[0] * size, y + center[0] * size - gap)
    #     ctx.lineTo(x + top_left[0] * size, y + top_left[1] * size - gap)


if __name__ == "__main__":
    main()