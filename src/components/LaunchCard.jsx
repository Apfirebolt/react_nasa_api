import { useEffect } from "react";
import PropTypes from "prop-types";
import { Card } from "antd";

const LaunchCard = ({ launch }) => {

  useEffect(() => {
    console.log("LaunchCard mounted");
    return () => {
      console.log("LaunchCard unmounted");
    };
  }, []);  
  return (
    <Card title={launch.mission_name}>
      <p>Details: {launch.details ? launch.details : "No details available"}</p>
      <p>Launch Year: {launch.launch_year}</p>
      <p>Launch Date: {launch.launch_date_utc}</p>
      <p>Rocket: {launch.rocket.rocket_name}</p>
      <p>Launch Site: {launch.launch_site.site_name}</p>
      <p>
        Links:{" "}
        <a
          href={launch.links.article_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Article
        </a>{" "}
        |{" "}
        <a
          href={launch.links.wikipedia}
          target="_blank"
          rel="noopener noreferrer"
        >
          Wikipedia
        </a>{" "}
        |{" "}
        <a
          href={launch.links.video_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Video
        </a>
      </p>
    </Card>
  );
};

LaunchCard.propTypes = {
  launch: PropTypes.shape({
    mission_name: PropTypes.string.isRequired,
    details: PropTypes.string,
    launch_year: PropTypes.string.isRequired,
    launch_date_utc: PropTypes.string.isRequired,
    rocket: PropTypes.shape({
      rocket_name: PropTypes.string.isRequired,
    }).isRequired,
    launch_site: PropTypes.shape({
      site_name: PropTypes.string.isRequired,
    }).isRequired,
    links: PropTypes.shape({
      article_link: PropTypes.string,
      wikipedia: PropTypes.string,
      video_link: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default LaunchCard;
