def string2bits(s=''):
    return ''.join([bin(ord(x))[2:].zfill(8) for x in s])


def bits2string(b=None):
    return ''.join([chr(int(x, 2)) for x in b])


def bytes2bits(bytes):
    return ''.join([bin(x)[2:].zfill(8) for x in bytes])


def bits2bytes(bits):
    bin_arr = bytearray()
    for x in bits:
        bin_arr.append(int(x, 2))
    return bin_arr
