export const getUser = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
        cache: "no-store", // Ensure fresh data every time
      });
      if (!res.ok) return null;
      return await res.json();
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };
  