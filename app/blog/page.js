import Link from 'next/link';
import BlogData from 'data/Blog.json';
import 'styles/blog.css';

export default function BlogPage() {
  return (
    <div className="blog-container">
      {BlogData.map((blog) => (
        <Link key={blog.id} href={`/blog/${blog.slug}`}>
          <div className="blog-card">
            <img className="blog-img" src={blog.image} alt={blog.title} />
            <div className="blog-content">
              <h3>{blog.title}</h3>
              <p>{blog.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
