import cv2
import numpy as np
import matplotlib.pyplot as plt
import math

image = cv2.imread("test_key_text_large.png")
# image = cv2.imread("test_key_text.png")

gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
denoise = cv2.fastNlMeansDenoising(gray, None)
# cv2.imshow("denoise", gray)

blur = cv2.GaussianBlur(denoise, (9,9), 0)
# cv2.imshow("blur", blur)


_, threshold = cv2.threshold(blur, 150, 255, cv2.THRESH_BINARY_INV )
cv2.imshow("thresh", threshold)

thinned = cv2.ximgproc.thinning(threshold, cv2.ximgproc.THINNING_ZHANGSUEN)
cv2.imshow("thinned", thinned)

lines = cv2.HoughLinesP(
    image=thinned,
    rho=1,
    theta=np.pi/180,
    threshold=10,
    minLineLength=15,
    maxLineGap=15
)
for points in lines:
    x1, y1, x2, y2 = points[0]
    cv2.line(image, (x1, y1), (x2, y2), (0,255,0), 2)


# lines = cv2.HoughLines(edges, 1, np.pi/180, 50)
# # Draw the lines
# if lines is not None:
#     for i in range(0, len(lines)):
#         rho = lines[i][0][0]
#         theta = lines[i][0][1]
#         a = math.cos(theta)
#         b = math.sin(theta)
#         x0 = a * rho
#         y0 = b * rho
#         pt1 = (int(x0 + 1000 * (-b)), int(y0 + 1000 * (a)))
#         pt2 = (int(x0 - 1000 * (-b)), int(y0 - 1000 * (a)))
#         cv2.line(image, pt1, pt2, (0, 0, 255), 3)

# contours, hierarchy = cv2.findContours(edges, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
# cv2.drawContours(image, contours, -1, (0, 255, 0), 1)

cv2.imshow("res", image)
cv2.waitKey(0)
cv2.destroyAllWindows()

