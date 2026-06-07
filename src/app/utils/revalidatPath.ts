 
  export const revalidatePath = async (path: string) => {
    try {
      const response = await fetch('/api/revalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result = await response.json();
      console.log(`Revalidated path: ${result.message}`);
    } catch (error) {
      console.error('Error in revalidating path:', error);
    }
  };
  