import argparse
import sys
import os
import json
def create_arg_parser():
    parser = argparse.ArgumentParser("build", description="build route data")
    parser.add_argument("source", metavar="SOURCE" ,type=str)
    return parser

def build(path, data: dict):
    if os.path.isfile(os.path.join(path, "index.json")):
        with open(os.path.join(path,"index.json")) as f:
            index = json.load(f)
        data["data"] = index
    dirs = os.listdir(path)
    for d in dirs:
        _path = os.path.join(path, d)
        if os.path.isdir(_path):
            data["dir"] = data.get("dir", dict())
            data["dir"][d] = data["dir"].get(d, dict())
            build(_path, data["dir"][d])


def main():
    p = create_arg_parser()
    args = p.parse_args(sys.argv[1:])
    data = dict()
    build(args.source, data)
    print(json.dumps(data, ensure_ascii=False, indent=1))

if __name__ == '__main__':
    main()