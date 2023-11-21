import os
import requests
import re

def download_file_from_comment(file_path):
    with open(file_path, 'rb') as file:
        try:
            content = file.read()
            
            # 使用正则表达式提取引用地址
            match = re.search(r'(引用地址：https?://[^\s]*\.js)', content.decode('utf-8'))
            
            if match:
                download_url = match.group(1)
                
                # 使用requests库下载文件
                response = requests.get(download_url)
                
                if response.status_code == 200:
                    # 提取文件名
                    _, file_extension = os.path.splitext(file_path)
                    filename = os.path.join("Script", f"{os.path.basename(file_path)}")
                    
                    # 保存文件
                    with open(filename, 'wb') as new_file:
                        # 在文件开头插入注释信息
                        new_file.write(f"// 引用地址：{download_url}\n".encode('utf-8'))
                        new_file.write(response.content)
                        
                    print(f"文件 {filename} 下载成功！")
                else:
                    print(f"下载失败，状态码：{response.status_code}, 错误信息：{response.text}")
            else:
                print(f"在文件 {file_path} 中未找到引用地址")
        except Exception as e:
            print(f"发生错误：{e}")
        finally:
            file.close()

# 文件夹路径
folder_path = os.path.join("Script")

# 遍历文件夹内的文件
for filename in os.listdir(folder_path):
    file_path = os.path.join(folder_path, filename)
    
    # 检查是否为文件并且以 .js 结尾
    if os.path.isfile(file_path) and re.search(r'\.js$', filename):
        download_file_from_comment(file_path)
