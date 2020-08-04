import requests

headers = {
    'Accept': 'application/vnd.go.cd.v4+json',
    'Content-Type': 'application/json',
}

data = '{ "hostname": "agent02.example.com", "agent_config_state": "Enabled", "resources": ["Java","Linux"], "environments": ["Dev"] }'

response = requests.patch('https://ci.example.com/go/api/agents/adb9540a-b954-4571-9d9b-2f330739d4da', headers=headers, data=data, auth=('username', 'password'))
