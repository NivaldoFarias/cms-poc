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
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
