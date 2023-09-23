import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("prompts").insert([
    { title: "Travel", description: "Need some ideas about your trip" },
    { title: "Translation", description: "Let's see how other languages say" },
    { title: "Summary", description: "Too long to read? Try this!" },
    {
      title: "Give a name",
      description: "A distinctive name for your new born baby?",
    },
  ]);

  await knex("assisted_questions").insert([
    {
      seq: "1",
      text: "Hi, what is the destination of your trip? eg. Hong Kong",
      label_id: "Trip",
    },
    {
      seq: "2",
      text: "How long are you going to stay?",
      label_id: "Trip",
    },
    {
      seq: "3",
      text: "Do you prefer a relative relaxed trip or a fast-paced tour?",
      label_id: "Trip",
    },
  ]);
}
