<img src="http://craydent.com/JsonObjectEditor/img/svgs/craydent-logo.svg" width=75 height=75/>

# auto-form-fill
**by Clark Inada**

A simple way to auto fill your forms so you don't have to keep typing data when testing.  The extension simply stores the form data in the query string (The URL).  This way you can bookmark or copy the link and visit it later with all the data filled.

## Limitations:
Since the data is stored in the URL, standard URL lengths apply.
Currently this extension supports only text and and password input types that have an "id" attribute.
This will not be able auto fill input elements loaded after the initial load (dynamic content).

## Notes:
Hidden input fields are not stored.

## Future Enhancements:
Support for other input types
Support dynamic content
Support CSS selector in addition to id attribute
Create customizable settings to change behavior for DOM selection and setting values.
