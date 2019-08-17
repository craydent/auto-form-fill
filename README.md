<img src="http://craydent.com/JsonObjectEditor/img/svgs/craydent-logo.svg" width=75 height=75/>

# auto-form-fill
**by Clark Inada**

This extension is primarily meant for testing and provides a simple way to auto fill your forms to eliminate repetitive typing of data when testing.  The extension simply stores the form data in the query string (The URL).  This way you can bookmark or copy the link and visit it later with all the data filled.


THIS EXTENSION WILL SHOW ALL FORM CONTENT IN PLAIN TEXT. DO NOT USE WITH SENSITIVE DATA UNLESS YOU DO NOT CARE ABOUT SHOWING IT IN THE URL.

Free to use for personal use and available at https://github.com/craydent/auto-form-fill/ (This is open source so you can download the contents from GitHub and install the extension). For enterprise users, please purchase the extension.

## Usage
On page load, auto-form-fill will take the values from the URL and fill any form fields that are loaded.  This poses an issue when there is dynamic content where the form fields appear after the initial page load.  To resolve this use `affinitdelay`. 

The `Populate` button will re-populate all items on the current page state.

The `Copy to Clipboard` will generate a URL based on the inputs with an `id` attribute.

There is a `affaction.cssSelector` and `affdelay` syntax you can use to perform basic actions on elements.  Make sure that your query key and value are url encoded with `encodeURIComponent`.

The `affinitdelay` is the initial delay before performing any actions or populating fields. (default is 0ms).

The `affdelay` is the delay between actions being performed (default is 0ms and the first action will execute without a delay).

Example for css selector `[data-attr="attribute"]`: 

`http://example.com?affaction.%5Bdata-attr%3D"attribute""%5D=click&affdelay=100&affinitdelay=1000` -> (This will essentially do a `document.querySelector('[data-attr="attribute"]').click()`)

## Limitations:
Since the data is stored in the URL, standard URL lengths apply.

Currently this extension supports only select and set elements that have a settable `.value` property.

This will not be able auto fill input elements loaded after the initial load (dynamic content). Use the `Populate` button for elements loaded dynamically.

When using `Copy to Clipboard`, the plugin will only pick up inputs with an `id` attribute.

## Notes:
Hidden input fields are not stored.

## Future Enhancements:
Create customizable settings to change behavior for DOM selection and setting values.
