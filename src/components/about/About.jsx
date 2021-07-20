import React from 'react';

const ABOUT_SECTION_STYLE = {
  marginBottom: '8px',
};

const KUBIQUITY_ABOUT_TEXT =
  'Kubiquity is a Kubernetes error logging and tracking tool developed and launched in 2021. Designed for production-level applications using Kubernetes to orchestrate containers, Kubiquity provides metrics on all pods memory use to help developers prevent OOM kill errors additionally, Kubiquity logs Kubernetes events to highlight any errors and warnings that originate within monitored clusters.';

const K8SM8S_ABOUT_TEXT =
  'K8sM8s is a developer group based in New York City focused on open source application development. Specializing in products that aid container orchestration development, our most recent product is Kubiquity.';

const K8SM8S_TEAM_TEXT =
  'K8sM8s is composed of the following engineers: David Anderson; Robert Hernandez; David Zhang; and Jeffrey Zheng.';

const About = () => (
  <div id="about-container">
    <div className="section-headers">ABOUT</div>
    <div className="about-section">
      <div className="about-subheader" style={ABOUT_SECTION_STYLE}>
        About Kubiquity
      </div>
      <p className="about-text">{KUBIQUITY_ABOUT_TEXT}</p>
    </div>
    <div className="about-section">
      <div className="about-subheader" style={ABOUT_SECTION_STYLE}>
        About K8sM8s
      </div>
      <p className="about-text">{K8SM8S_ABOUT_TEXT}</p>
      <p className="about-text">{K8SM8S_TEAM_TEXT}</p>
    </div>
    <div className="about-section">
      <div className="about-subheader" style={ABOUT_SECTION_STYLE}>
        Contact
      </div>
      <p className="about-text">
        If you want to contact the K8sM8s team about Kubiquity, please contact
        us at <a href="mailto:kubiquityapp@gmail.com">kubiquityapp@gmail.com</a>
        .
      </p>
    </div>
  </div>
);

export default About;
