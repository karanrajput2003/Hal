import sys
import json
import requests

# API endpoint configuration
api_url = "https://transcribe.whisperapi.com"
headers = {'Authorization': 'Bearer ZDUHZVZG5KUCDLJ7PWRTF8HAB9URN93U'}

# Payload setup for API request
payload = {
    'file': {'file': open(sys.argv[1], 'rb')},
    'data': {
        "fileType": "YOUR_FILE_TYPE",  # Default is 'wav'.
        "diarization": "false",  # 'True' may slow down processing.
        "numSpeakers": "2",  # Optional: Number of speakers for diarization. If blank, model will auto-detect.
        #"url": "URL_OF_STORED_AUDIO_FILE",  # Use either URL or file, not both.
        "initialPrompt": "",  # Optional: Teach model a phrase. May negatively impact results.
        "language": "en",  # Optional: Language of speech. If blank, model will auto-detect.
        "task": "transcribe",  # Use 'translate' to translate speech from language to English. Transcribe is default.
        "callbackURL": "",  # Optional: Callback URL for results to be sent.
    }
}

# Ensure the 'callbackURL' starts with 'https://' and does not include 'www.'
# The server calls the callback URL once the response is ready.

# Make the API request and print the response
response = requests.post(api_url, headers=headers, files=payload['file'], data=payload['data'])

data = response.json()

resp = {
    "Response":200,
    "Message":"Data from Python",
    "Data":data
}

print(json.dumps(resp))
sys.stdout.flush()


