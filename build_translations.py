"""
Requires an openauth2 id from Google: https://developers.google.com/sheets/api/quickstart/python
"""

from googleapiclient import discovery
from google.oauth2 import service_account

SCOPES = [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets.readonly',
        ]

CLIENT_SECRET_FILE = 'tenhou.json'
APPLICATION_NAME = 'Google Sheets API ApplySci'

SPREADSHEET = '19ljobfecXWJV-m5Rba5HM6BJ_x689KU2mguC-YxhhbQ'
LANGUAGE_COUNT = 7
SHEETS = {
    '1. Exact!A:I': 'exactTranslation',
    '2. Partial': 'partialTranslation',
    '3. Partial Stats': 'partialTranslationForStats',
    '4. Tooltips': 'tooltips',
    #'5. Listing': 'listing',
    #'A. Options': 'options',
}


def main():
    """
    write the translations.js file using entries from the spreadsheet
    """
    credentials = service_account.Credentials.from_service_account_file(
            CLIENT_SECRET_FILE,
            scopes=SCOPES
            )

    service = discovery.build('sheets', 'v4', credentials=credentials)
        #discoveryServiceUrl='https://sheets.googleapis.com/$discovery/rest?version=v4')


    with open('translations.js', 'w', encoding='utf=8') as jsfile:
        for source, dest in SHEETS.items():
            jsfile.write('const %s = {\n' % dest)
            result = service.spreadsheets().values().get( #pylint: disable=E1101
                spreadsheetId=SPREADSHEET, range=source).execute() #pylint: disable=E1101
            values = result.get('values', [])

            if not values:
                print('No data found on sheet %s' % source)
            else:
                langs = [x.split(' ')[0] for x in values[0][1 : LANGUAGE_COUNT + 1]]
                del values[0]
                for row in values:
                    if row[0]:
                        jsfile.write("    '%s': {\n" % row[0])
                        for i in range(0, min(LANGUAGE_COUNT, len(row) - 1)):
                            if row[i + 1]:
                                translated = row[i+1].replace("'","\\'")
                                if translated == 'Ø':
                                    translated = 'null'
                                else:
                                    translated = "'%s'" % translated
                                jsfile.write("        '%s': %s,\n" %
                                             (langs[i], translated))
                        jsfile.write('    },\n')

            jsfile.write('};\n\n')


if __name__ == '__main__':
    main()
