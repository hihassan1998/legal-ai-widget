import "./testpage.css";
import WidgetLoader from "./components/WidgetLoader";

export default function Home() {
  return (
    <main className="main">
      <h1>Legal AI Widget MVP</h1>

      <p>
        This page loads the widget exactly like a customer website would.
      </p>

      <WidgetLoader />
    </main>
  );
}