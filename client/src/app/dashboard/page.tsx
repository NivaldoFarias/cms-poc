import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";

export default function Dashboard() {
  useEffect(() => {
    toast.success("Tudo Pronto!", {
      draggable: true,
      progress: 1,
    });
  }, []);

  return (
    <div>
      <p>This is the Dashboard</p>
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={5000}
        rtl={false}
        draggable={true}
        closeOnClick={true}
        newestOnTop={false}
        pauseOnHover={false}
        hideProgressBar={false}
        pauseOnFocusLoss={false}
      />
    </div>
  );
}
