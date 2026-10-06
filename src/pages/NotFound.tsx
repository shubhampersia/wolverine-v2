import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Page Not Found | WLVTEC</title>

        <meta
          name="description"
          content="The page you are looking for could not be found. Return to the WLVTEC homepage for precision tube bending and engineered tubular assembly solutions."
        />

        {/* 404s are served with a 200 status because of the SPA rewrite in
            vercel.json, so tell crawlers not to index them. Remove this line
            if you would rather the page stay indexable. */}
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
          <a href="/" className="text-primary underline hover:text-primary/90">
            Return to Home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;