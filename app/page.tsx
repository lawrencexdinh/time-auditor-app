export default function Home({ params }: PageProps<"/">) {
  void params;

  return (
    <main>
      <h1>Hello World</h1>
    </main>
  );
}
