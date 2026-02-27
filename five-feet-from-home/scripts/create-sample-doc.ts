/**
 * Create a sample .docx file for testing ingestion
 *
 * Usage: npx tsx scripts/create-sample-doc.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { Document, Packer, Paragraph, HeadingLevel, TextRun } from 'docx';

async function main() {
  const ingestDir = path.resolve(process.cwd(), 'ingest');

  // Create ingest directory if it doesn't exist
  if (!fs.existsSync(ingestDir)) {
    fs.mkdirSync(ingestDir, { recursive: true });
  }

  // Create sample document
  const doc = new Document({
    sections: [
      {
        children: [
          // Title
          new Paragraph({
            text: 'Story Bible - Sample Project',
            heading: HeadingLevel.TITLE,
          }),

          // Character Section
          new Paragraph({
            text: 'Character: Elena Blackwood',
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Name: ', bold: true }),
              new TextRun('Elena "Ellie" Blackwood'),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Age: ', bold: true }),
              new TextRun('34'),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Archetype: ', bold: true }),
              new TextRun('Reluctant Hero'),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Background: ', bold: true }),
              new TextRun(
                'Former detective who left the force after a case went wrong. Now works as a private investigator, taking only cases she believes in.'
              ),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Motivation: ', bold: true }),
              new TextRun('To redeem herself for the case that ended her career.'),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Fear: ', bold: true }),
              new TextRun('Making another mistake that costs someone their life.'),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Flaw: ', bold: true }),
              new TextRun('Takes on too much responsibility; cannot delegate or trust others.'),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Secret: ', bold: true }),
              new TextRun('She knows who really committed the crime that ended her career.'),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Voice Notes: ', bold: true }),
              new TextRun(
                'Speaks in short, declarative sentences. Rarely asks questions - makes statements instead. Uses cop jargon out of habit.'
              ),
            ],
          }),

          // Another Character
          new Paragraph({
            text: 'Character: Marcus Webb',
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Name: ', bold: true }),
              new TextRun('Marcus Webb'),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Age: ', bold: true }),
              new TextRun('28'),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Archetype: ', bold: true }),
              new TextRun('The Informant'),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Background: ', bold: true }),
              new TextRun(
                'Tech genius who makes a living selling information to the highest bidder. Has connections everywhere.'
              ),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Motivation: ', bold: true }),
              new TextRun('Money, primarily, but he has a code - he never sells information that gets innocents hurt.'),
            ],
          }),

          // Location
          new Paragraph({
            text: 'Location: The Rusty Anchor',
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Description: ', bold: true }),
              new TextRun(
                'A dive bar on the waterfront that serves as Elena\'s unofficial office. Dark wood paneling, a jukebox that only plays 80s rock, and a bartender who sees everything but says nothing.'
              ),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Significance: ', bold: true }),
              new TextRun(
                'Neutral ground where information is traded. Everyone from cops to criminals drinks here.'
              ),
            ],
          }),

          // Plot Thread
          new Paragraph({
            text: 'Plot Thread: The Morrison Case',
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Premise: ', bold: true }),
              new TextRun(
                'A wealthy businessman hires Elena to find his missing daughter, but nothing about the case is what it seems.'
              ),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Stakes: ', bold: true }),
              new TextRun(
                'A young woman\'s life hangs in the balance, and Elena realizes the father may be the one she needs protecting from.'
              ),
            ],
          }),

          // Chapter
          new Paragraph({
            text: 'Chapter 1: Old Debts',
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Synopsis: ', bold: true }),
              new TextRun(
                'Elena receives a visit from James Morrison, a man she investigated years ago. He claims his daughter Sarah has been missing for three days, and the police aren\'t taking it seriously. Against her better judgment, Elena takes the case.'
              ),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'POV: ', bold: true }),
              new TextRun('Elena Blackwood'),
            ],
          }),
          new Paragraph({
            text: 'The rain hadn\'t stopped for three days. Elena watched it streak down the window of her office, thinking about nothing in particular, when the door opened.',
          }),
          new Paragraph({
            text: '"Detective Blackwood," the man said. He was expensive - suit, watch, haircut. Everything about him screamed money.',
          }),
          new Paragraph({
            text: '"Not detective anymore." She didn\'t stand. "What do you want, Morrison?"',
          }),
        ],
      },
    ],
  });

  // Save the document
  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(ingestDir, 'sample-story-bible.docx');
  fs.writeFileSync(outputPath, buffer);

  console.log(`Sample document created: ${outputPath}`);
  console.log('');
  console.log('Now run `npm run ingest` to process this document.');
}

main().catch(console.error);
