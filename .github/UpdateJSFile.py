import os
import requests
import re
from requests.exceptions import RequestException
from datetime import datetime, timedelta, timezone

def download_file_from_comment(file_path):
    with open(file_path, 'rb') as file:
        try:
            content = file.read()

            # 使用正则表达式提取引用地址
            match = re.search(r'(引用地址：https?://[^\s]*\.js)', content.decode('utf-8'))

            if match:
                full_url = match.group(1)
                # 去除 "引用地址：" 部分
                download_url = full_url.replace('引用地址：', '')

                # 使用 requests 库下载文件
                try:
                    response = requests.get(download_url)
                    response.raise_for_status()  # 如果请求失败，会引发异常
                except RequestException as e:
                    print(f"下载失败，错误信息：{e}")
                    return

                # 提取文件名
                _, file_extension = os.path.splitext(os.path.basename(file_path))
                filename = os.path.join("Script", f"{os.path.basename(file_path)}")

                # 获取当前北京时间
                beijing_time = datetime.now(timezone(timedelta(hours=8)))
                beijing_time_str = beijing_time.strftime("%Y-%m-%d %H:%M:%S")

                # 保存文件
                with open(filename, 'wb') as new_file:
                    # 在文件开头插入注释信息
                    new_file.write(f"// 引用地址：{download_url}\n".encode('utf-8'))
                    new_file.write(f"// 更新时间：{beijing_time_str}\n".encode('utf-8'))
                    new_file.write(response.content)

                print(f"文件 {filename} 下载成功！")
            else:
                print(f"在文件 {file_path} 中未找到引用地址")
        except Exception as e:
            print(f"发生错误：{e}")

# 文件夹路径
folder_path = "Scripts"

# 遍历文件夹内的文件
for filename in os.listdir(folder_path):
    file_path = os.path.join(folder_path, filename)

    # 检查是否为文件并且以 .js 结尾
    if os.path.isfile(file_path) and re.search(r'\.js$', filename):
        download_file_from_comment(file_path)
