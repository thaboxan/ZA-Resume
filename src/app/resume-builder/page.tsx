"use client";
import { Provider } from "react-redux";
import { store } from "lib/redux/store";
import { ResumeForm } from "components/ResumeForm";
import { Resume } from "components/Resume";

export default function Create() {
  return (
    <Provider store={store}>
      <main className="relative h-full w-full overflow-hidden bg-gray-50">
        <div className="flex flex-col md:grid md:grid-cols-3 lg:grid-cols-6">
          <div className="order-2 md:order-1 md:col-span-3">
            <ResumeForm />
          </div>
          <div className="order-1 md:order-2 md:col-span-3">
            <Resume />
          </div>
        </div>
      </main>
    </Provider>
  );
}
