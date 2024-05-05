import os
import requests
import re
from datetime import datetime

# 默认下载目录
download_directory = "QuantumultX/Rule"

# 定义多个下载链接和对应的文件名
download_links = {
    "https://raw.githubusercontent.com/LM-Firefly/Rules/master/Adblock/Adblock.list": "MyAdblock.list",
}

# 循环下载并保存文件
for url, file_name in download_links.items():
    # 删除旧文件（如果存在）
    old_file_path = os.path.join(download_directory, file_name)
    if os.path.exists(old_file_path):
        os.remove(old_file_path)
        print(f"旧文件 '{file_name}' 已删除！")

    # 下载文件
    response = requests.get(url)
    content = response.text

    # 在每一行的末尾添加",reject"，并替换行首的内容
    lines = content.split("\n")
    new_content = ""
    for line in lines:
        if line.startswith("#"):
            new_content += line + "\n"
        else:
            line = re.sub(r'^\s*DOMAIN', 'HOST', line)
            line = re.sub(r'$', ',reject', line)
            new_content += line.strip() + "\n"

    # 添加更新时间
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    new_content = f"# 更新时间：{now}\n" + new_content

    # 移除最后一行的空行（如果有）
    new_content = new_content.strip()

    # 写入新文件到指定目录
    file_path = os.path.join(download_directory, file_name)
    with open(file_path, "w") as file:
        file.write(new_content)

    print(f"文件 '{file_name}' 已下载并替换完成！")
