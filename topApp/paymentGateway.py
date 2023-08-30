import http.client

conn = http.client.HTTPSConnection("api-gateway.ctechpay.com")
payload = ''
headers = {
  'token': 'UOavDtqLpVp1ZfYEujpjRpEKLplxoY8P24k143qlruchAtrwAvDOVcbj1QtZbCMf'
}
conn.request("GET", "/airtel/access/status/?trans_id=TRANSID197114CTECHPAY", payload, headers)
res = conn.getresponse()
data = res.read()
print(data.decode("utf-8"))