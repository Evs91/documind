import { extractData } from '../main-extractor.js'; 
import { isPdfFile } from '../utils/pdfValidator.js';
import { validateSchema } from '../utils/schemaValidator.js';
import { getTemplate } from './templates.js';

/**
 * Extracts data from a document based on a provided schema.
 * @param {object} options - Options for the extraction process.
 * @param {string} options.file - The file path to the document.
 * @param {object} options.schema - The schema definition for data extraction.
 * * @param {string} [options.template] - Name of a pre-defined template.
 * @returns {Promise<object>} - The result of the extraction, including pages, extracted data, and file name.
 */
export async function extract({ file, schema, template }) {
  try {
    if (!file) {
      throw new Error('File is required.');
    }

    if (!isPdfFile(file)) {
      throw new Error('File must be a PDF.');
    }

    let finalSchema;
    if (template) {
      finalSchema = getTemplate(template); // Use pre-defined template
    } else if (schema) {
      const { isValid, errors } = validateSchema(schema);
      if (!isValid) {
        throw new Error(`Invalid schema format: ${errors.join(', ')}`);
      }
      finalSchema = schema; // Use custom schema
    } else {
      throw new Error('You must provide a custom schema or template');
    }

    const result = await extractData(file, finalSchema);

    return {
      success: true,
      pages: result.totalPages,
      data: result.event,
      fileName: result.fileName
    };
  } catch (error) {
    console.error('Error processing document:', error);
    throw new Error(`Failed to process document: ${error.message}`);
  }
}
