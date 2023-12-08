import random

from my_app.watermark import util
from my_app.watermark.ecc import ReedSolomonCodec, HammingCodec



class WM(object):

    def __init__(self, uid):
        self.hm = HammingCodec()
        self.rs = ReedSolomonCodec()
        self.password = uid
        self.wm_len = 85


    def generate_wm_positions(self, rows, columns):
        pos_arr = [[] for i in range(rows + columns - 1)]
        center = [rows // 2, columns // 2]
        delt_x = 100 if rows > 600 else 50
        delta_y = 100 if columns > 600 else 50
        for i in range(center[0] - delt_x, center[0] + delt_x):
            for j in range(center[1] - delta_y, center[1] + delta_y):
                random_number = random.randint(0, 100)
                sum = i + j
                if (random_number > 33):
                    if (sum % 2 == 0):
                        pos_arr[sum].insert(0, [i, j, random_number > 66])
                    else:
                        pos_arr[sum].append([i, j, random_number > 66])
        return pos_arr

    def encode(self, img, wm_text):
        i = 0
        wm_text = wm_text.rjust(40)
        e_ham = self.hm.encode_ham_chunk(wm_text)
        enc_str = self.rs.encode_rs(e_ham)
        wm = util.bytes2bits(enc_str)  # string2bits(str(encStr)) #"011011000110010101100100011001110110010101110010"

        random.seed(self.password)  # set the seed
        width, height = img.size
        lst_x = list(range(width))
        lst_y = list(range(height))
        num_bytes = len(wm) // 4
        used_bits = 0

        for i in range(0, num_bytes):
            x = random.sample(lst_x, 1)[0]
            y = random.sample(lst_y, 1)[0]
            # print([x, y])
            pixel = list(img.getpixel((x, y)))
            for n in range(0, 3, 2):
                if used_bits < len(wm):
                    pixel[n] = pixel[n] & ~3 | int(wm[used_bits]) << 1 | int(wm[used_bits + 1])
                    used_bits += 2
            img.putpixel((x, y), tuple(pixel))

    def decode(self, img):

        extracted_bin = []
        c = ''
        random.seed(self.password)  # set the seed
        width, height = img.size
        lst_x = list(range(width))
        lst_y = list(range(height))
        num_bytes = 8 * self.wm_len // 4
        used_bits = 0
        for i in range(0, num_bytes):
            x = random.sample(lst_x, 1)[0]
            y = random.sample(lst_y, 1)[0]
            # print([x, y])
            pixel = list(img.getpixel((x, y)))
            for n in range(0, 3, 2):
                if used_bits < 8 * self.wm_len:
                    c = "".join([c, str((pixel[n] & 2) >> 1), str(pixel[n] & 1)])
                    used_bits += 2
                    if used_bits % 8 == 0:
                        extracted_bin.append(c)
                        c = ''

        data = util.bits2bytes(extracted_bin)  # bits2string(extracted_bin)
        dec_rs = self.rs.decode_rs(data)
        return util.bits2string(self.hm.decode_ham(util.bytes2bits(dec_rs)))
