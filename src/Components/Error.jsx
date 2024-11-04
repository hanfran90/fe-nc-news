function Error({ error }) {
    return (
      <section>
        <p>{error.status}</p>
        <p>{error.msg}</p>
      </section>
    );
  }
  
  export default Error;