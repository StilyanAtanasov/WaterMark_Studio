from reedsolo import RSCodec, ReedSolomonError

from my_app.watermark import util


class HammingCodec(object):

    def __init__(self):
        self.K = 4

    def encode_ham_chunk(self, s):
        res = ''
        s = util.string2bits(s)
        while len(s) >= self.K:
            extract_part = s[0:self.K]
            res += '0' + self.encode_ham(extract_part)
            s = s[self.K:]
        return bytearray(int(res, 2).to_bytes((len(res) + 7) // 8))

    def encode_ham(self, bits):
        t1 = self.parity_ham(bits, [0, 1, 3])
        t2 = self.parity_ham(bits, [0, 2, 3])
        t3 = self.parity_ham(bits, [1, 2, 3])
        return t1 + t2 + bits[0] + t3 + bits[1:]

    def parity_ham(self, s, indexes):
        sub = ""
        for i in indexes:
            sub += s[i]
        return str(sub.count("1") % 2)

    def decode_ham(self, bits_array):
        decoded_bits = []
        bits_array = bits_array[1:]
        s = ''
        while len(bits_array) >= self.K + 3:
            b1 = (int(bits_array[0]) + int(bits_array[2]) + int(bits_array[4]) + int(bits_array[6])) % 2
            b2 = (int(bits_array[1]) + int(bits_array[2]) + int(bits_array[5]) + int(bits_array[6])) % 2
            b3 = (int(bits_array[3]) + int(bits_array[4]) + int(bits_array[5]) + int(bits_array[6])) % 2
            b = 4 * b3 + 2 * b2 + b1
            if b == 0 or b == 1 or b == 2 or b == 4:
                s += str(bits_array[2]) + str(bits_array[4]) + str(bits_array[5]) + str(bits_array[6])
            else:
                y = list(bits_array)
                y[b - 1] = str((int(y[b - 1]) + 1) % 2)
                s += y[2] + y[4] + y[5] + y[6]
            if len(s) == 8:
                decoded_bits.append(s)
                s = ''
            bits_array = bits_array[self.K + 3 + 1:]
        return decoded_bits


class ReedSolomonCodec(object):

    def __init__(self):
        self.rsc = RSCodec(5)  # 5 ecc symbols

    def encode_rs(self, msg):
        return self.rsc.encode(msg)

    def decode_rs(self, msg):
        return self.rsc.decode(msg)[0]
