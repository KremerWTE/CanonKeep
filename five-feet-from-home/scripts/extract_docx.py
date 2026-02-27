import os
import sys
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

def extract_text_from_docx(docx_path):
    """Extract text from a docx file by reading the XML."""
    try:
        with zipfile.ZipFile(docx_path, 'r') as zip_ref:
            # Read document.xml
            if 'word/document.xml' in zip_ref.namelist():
                with zip_ref.open('word/document.xml') as xml_file:
                    tree = ET.parse(xml_file)
                    root = tree.getroot()

                    # Define namespace
                    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}

                    # Extract all text
                    texts = []
                    for elem in root.iter():
                        if elem.tag.endswith('}t'):
                            if elem.text:
                                texts.append(elem.text)
                        elif elem.tag.endswith('}p'):
                            texts.append('\n')

                    return ''.join(texts)
    except zipfile.BadZipFile:
        return None
    except Exception as e:
        return None
    return None

def main():
    base_dir = Path(r"C:\Users\Chris Kremer\Documents\GitHub\five-feet-from-home")
    output_dir = base_dir / "extracted_docs"
    output_dir.mkdir(exist_ok=True)

    # Find all docx files
    docx_files = list(base_dir.rglob("*.docx"))
    docx_files = [f for f in docx_files if 'node_modules' not in str(f)]

    print(f"Found {len(docx_files)} docx files")

    extracted = 0
    failed = []

    for docx_path in docx_files:
        relative = docx_path.relative_to(base_dir)
        output_name = str(relative).replace('\\', '_').replace('/', '_').replace('.docx', '.txt')
        output_path = output_dir / output_name

        text = extract_text_from_docx(docx_path)

        if text:
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(text)
            print(f"OK: {docx_path.name}")
            extracted += 1
        else:
            failed.append(docx_path.name)

    print(f"\nExtracted: {extracted}")
    print(f"Failed: {len(failed)}")

    if failed:
        print("\nFailed files (may be old .doc format):")
        for f in failed[:10]:
            print(f"  - {f}")
        if len(failed) > 10:
            print(f"  ... and {len(failed) - 10} more")

if __name__ == "__main__":
    main()
