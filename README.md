<!-- Add banner here -->
![banner](https://i.imgur.com/FofrKIt.png)
# Kubiquity

<!-- Add buttons here -->
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/oslabs-beta/Kubiquity?include_prereleases)
![GitHub pull requests](https://img.shields.io/github/issues-pr/oslabs-beta/kubiquity)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/oslabs-beta/Kubiquity#readme)
[![License: MIT](https://img.shields.io/github/license/oslabs-beta/Kubiquity)](https://github.com/oslabs-beta/Kubiquity/blob/master/LICENSE)
[![Twitter: kubiquityapp](https://img.shields.io/twitter/follow/kubiquityapp.svg?style=social)](https://twitter.com/kubiquityapp)


### 🏠 [Homepage](https://kubiquity.io)

>Kubiquity is a real-time Kubernetes error-monitoring tool. Kubiquity runs locally as an Electron application and incorporates Prometheus metrics queries for a cluster's CPU and memory usage by node.



# Preview

![Demo](https://imgur.com/BHQuJVW.gif)
# Table of contents

- [Kubiquity](#kubiquity)
    - [🏠 Homepage](#-homepage)
- [Preview](#preview)
- [Table of contents](#table-of-contents)
- [Installation](#installation)
- [Usage Requirements](#usage-requirements)
- [Planned implementations](#planned-implementations)
- [Contributions](#contributions)
- [Contributors](#contributors)
- [License](#license)

# Installation
[(Back to top)](#table-of-contents)

Visit our [releases page](https://github.com/oslabs-beta/Kubiquity/releases) to download the latest release for your operating system.

To package the app from the source code, fork and clone the repo, then run the following commands:

1. ```yarn```
2. ```yarn run package-linux``` or ```yarn run package-win``` based on your OS.
3. The app will be created and placed in the ```release-builds``` folder.

# Usage Requirements
[(Back to top)](#table-of-contents)


- To start, spin up a Kubernetes cluster.
- If not already using Prometheus, follow these steps to install and run Prometheus: https://prometheus-community.github.io/helm-charts
- Download the Kubiquity from our releases or package the app yourself
- Start up Kubiquity


# Planned implementations
[(Back to top)](#table-of-contents)

- [ ] Add Mac OS support.
- [ ] Add time travel debugging by saving a snapshot of the current state of the cluster.
- [ ] Store and display CPU and memory usage over time.
- [ ] Add recommended course of action based on warnings and errors.

# Contributions
[(Back to top)](#table-of-contents)

Kubiquity is currently in beta and is being actively developed by the K8sM8s team. 

We also welcome contributions from the community. If you are interested in contributing to the project, please contact us at kubiquityapp@gmail.com or fork the project and submit a pull request.

# Contributors
[(Back to top)](#table-of-contents)


<a href="https://github.com/dlande000"><img src="https://avatars.githubusercontent.com/u/44009893?v=4" width=200px height=200px /></a>
David Anderson                                      |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| **[![David Anderson](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/dlande000)  [![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dlande000/)** |




<a href="https://github.com/Hydroelectric29"><img src="https://avatars.githubusercontent.com/u/39108231?v=4" width=200px height=200px /></a>
Robert Hernandez                                      |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| **[![Robert Hernandez](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Hydroelectric29)  [![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/robert-hernandez-879108211/)** |


<a href="https://github.com/davidzhangnyc"><img src="https://avatars.githubusercontent.com/u/11681692?v=4" width=200px height=200px /></a>
David Zhang                                      |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| **[![David Zhang](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/davidzhangnyc)  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/davidnyc/)** |


<a href="https://github.com/JefZheng"><img src="https://avatars.githubusercontent.com/u/39392074?v=4" width=200px height=200px /></a>
Jeffrey Zheng                             |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| **[![Jeffrey Zheng](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/JefZheng) [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/JefZheng/)** |


# License
[(Back to top)](#table-of-contents)

Copyright © 2021 [k8sm8s](https://github.com/oslabs-beta).

This product is [MIT](https://github.com/oslabs-beta/Kubiquity/blob/master/LICENSE) licensed.

This product is accelerated by [OS Labs](https://opensourcelabs.io).
