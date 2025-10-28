import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const About = () => {
  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "5,000+", label: "Products Available" },
    { number: "50+", label: "Brand Partners" },
    { number: "99.9%", label: "Uptime Guarantee" }
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://picsum.photos/id/64/300/300",
      description: "Passionate about creating exceptional shopping experiences."
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://picsum.photos/id/65/300/300",
      description: "Leading our technology innovation and platform development."
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Customer Experience",
      image: "https://picsum.photos/id/66/300/300",
      description: "Ensuring every customer interaction exceeds expectations."
    }
  ];

  const values = [
    {
      icon: "bi-heart",
      title: "Customer First",
      description: "Every decision we make starts with our customers in mind."
    },
    {
      icon: "bi-shield-check",
      title: "Trust & Security",
      description: "Your data and transactions are protected with industry-leading security."
    },
    {
      icon: "bi-lightning",
      title: "Innovation",
      description: "We continuously evolve to bring you the latest in e-commerce technology."
    },
    {
      icon: "bi-globe",
      title: "Sustainability",
      description: "Committed to responsible business practices and environmental stewardship."
    }
  ];

  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-purple text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">About ShopEase</h1>
              <p className="lead mb-4">
                Transforming the way you shop online with innovative technology, 
                exceptional service, and unbeatable value since 2020.
              </p>
            </div>
            <div className="col-lg-6">
              <img
                src="https://picsum.photos/id/2/600/400"
                alt="About ShopEase"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-12">
\            <div className="row g-4">
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body p-4">
                    <h4 className="text-purple text-2xl mb-3">The Beginning</h4>
                    <p className="text-muted text-lg">
                      Founded in 2020 by a team of passionate entrepreneurs, ShopEase was born 
                      from a simple idea: make online shopping effortless, secure, and enjoyable 
                      for everyone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body p-4">
                    <h4 className="text-purple mb-3 text-2xl">Our Growth</h4>
                    <p className="text-muted text-lg">
                      What started as a small startup has grown into a trusted platform 
                      serving thousands of customers worldwide, partnering with top brands 
                      to bring you quality products at competitive prices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5">ShopEase by the Numbers</h2>
          <div className="row g-4">
            {stats.map((stat, index) => (
              <div key={index} className="col-6 col-md-3">
                <div className="text-center">
                  <div className="display-4 fw-bold text-purple mb-2">
                    {stat.number}
                  </div>
                  <p className="text-muted mb-0">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Values Section */}
      <div className="container py-5">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <h2 className="mb-4">Our Mission</h2>
            <p className="lead text-muted">
              To democratize commerce by providing a platform where anyone can discover, 
              purchase, and enjoy quality products with confidence, convenience, and exceptional value.
            </p>
          </div>
        </div>

        <h3 className="text-center mb-5">Our Values</h3>
        <div className="row g-4">
          {values.map((value, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className="card text-center h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <h5 className="mb-3">{value.title}</h5>
                  <p className="text-muted small">{value.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5">Meet Our Team</h2>
          <div className="row g-4 justify-content-center">
            {teamMembers.map((member, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center p-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="rounded-circle mb-3 mx-auto"
                      style={{ width: "120px", height: "120px", objectFit: "cover" }}
                    />
                    <h5 className="mb-1">{member.name}</h5>
                    <p className="text-purple fw-medium mb-3">{member.role}</p>
                    <p className="text-muted small">{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

export default About