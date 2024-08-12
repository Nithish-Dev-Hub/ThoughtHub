const WelcomePage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to ThoughtHub</h1>
      <p style={styles.description}>
        Dive into a collection of blogs where thoughts, ideas, and opinions on various topics are shared by people just like you. Whether you're here to read, learn, or share your own thoughts, ThoughtHub is the place for you.
      </p>
      <div style={styles.featureContainer}>
        <div style={styles.featureItem}>
          <img
            style={styles.featureImage}
            src="https://via.placeholder.com/150"
            alt="Diverse Topics"
          />
          <h3 style={styles.featureTitle}>Diverse Topics</h3>
          <p style={styles.featureDescription}>
            Explore blogs on technology, lifestyle, culture, and more.
          </p>
        </div>
        <div style={styles.featureItem}>
          <img
            style={styles.featureImage}
            src="https://via.placeholder.com/150"
            alt="Community Voices"
          />
          <h3 style={styles.featureTitle}>Community Voices</h3>
          <p style={styles.featureDescription}>
            Read thoughts and opinions from people around the world.
          </p>
        </div>
        <div style={styles.featureItem}>
          <img
            style={styles.featureImage}
            src="https://via.placeholder.com/150"
            alt="Share Your Thoughts"
          />
          <h3 style={styles.featureTitle}>Share Your Thoughts</h3>
          <p style={styles.featureDescription}>
            Join the conversation by writing your own blog post.
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f5',
    padding: '20px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '3rem',
    color: '#333',
    marginBottom: '20px',
  },
  description: {
    fontSize: '1.5rem',
    color: '#555',
    marginBottom: '40px',
    maxWidth: '600px',
    lineHeight: '1.5',
  },
  featureContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: '900px',
  },
  featureItem: {
    width: '250px',
    textAlign: 'center',
  },
  featureImage: {
    width: '100%',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  featureTitle: {
    fontSize: '1.25rem',
    color: '#333',
    marginBottom: '10px',
  },
  featureDescription: {
    fontSize: '1rem',
    color: '#666',
  },
};

export default WelcomePage;
