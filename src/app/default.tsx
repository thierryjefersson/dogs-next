import RootLayout from "./layout";

export default async function Default(
  props: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
  }>,
) {
  return <RootLayout {...props} />;
}
