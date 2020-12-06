import cgi
from http.server import HTTPServer, BaseHTTPRequestHandler, SimpleHTTPRequestHandler
import base64
from PIL import Image
import multipart
from main import detect_object_on_image
from streaming_form_data import StreamingFormDataParser
from streaming_form_data.targets import ValueTarget, FileTarget, NullTarget
import multipart as mp
# from multipart import to_bytes


from PIL import Image
from io import BytesIO


class HTTPHandlers(SimpleHTTPRequestHandler):

    def do_POST(self):
        print(self.headers)

        fields = {}
        files = {}

        def on_field(field):
            fields[field.field_name] = field.value

        def on_file(file):
            files[file.field_name] = {'name': file.file_name, 'file_object': file.file_object}

        multipart_headers = {'Content-Type': self.headers.get('Content-Type'),
                             'Content-Length': self.headers.get('Content-Length')}

        multipart.parse_form(multipart_headers, self.rfile, on_field, on_file)
        img = Image.open(BytesIO(fields[None]))
        # img.show()
        img.thumbnail((1200, 1200), Image.ANTIALIAS)
        img.save('tmp/tmp_img.jpg')
        detect_object_on_image('tmp/tmp_img.jpg')

        with open("tmp/tmp_detected_img.jpg", "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read())
        # print(files)
        # for each_file, each_file_details in files.items():
        #     with open(each_file_details['name'], 'wb') as f:
        #         uploaded_file = each_file_details['file_object']
        #         uploaded_file.seek(0)
        #         f.write(uploaded_file.read())

        # data = self.rfile.read(int(self.headers.get('Content-Length')))
        # empty = [data]
        # with open('processing.txt', 'wb') as file:
        #     for item in empty:
        #         file.write(item)
        #
        # file.close()

        # img = Image.open(BytesIO(self.rfile.read(int(self.headers.get('Content-Length')))))
        # print(img)
        self.send_response(200)
        self.send_header('content-type', 'text/html')
        self.end_headers()
        self.wfile.write(encoded_string)


if __name__ == '__main__':
    httpd = HTTPServer(('', 8080), HTTPHandlers)
    print('http server start')
    httpd.serve_forever()
