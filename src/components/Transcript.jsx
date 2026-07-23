function Transcript({ text, setText }) {
  return (
    <section className="card">
      <h2 style={{ textAlign: 'center' }}>📝 Transcript</h2>

      <textarea
      style={{ color: '#4B5563', fontSize: '40px' }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Your speech appears here..."
      />
    </section>
  );
}

export default Transcript;
