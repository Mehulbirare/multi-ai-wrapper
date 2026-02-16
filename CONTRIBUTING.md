# Contributing to Multi-AI Wrapper

Thank you for your interest in contributing! We love seeing the community get involved.

## How to Contribute

1.  **Fork the Repository**: Start by forking `https://github.com/Mehulbirare/multi-ai-wrapper`.
2.  **Create a Branch**: Create a new branch for your feature or fix.
    ```bash
    git checkout -b feature/my-new-provider
    ```
3.  **Make Changes**: 
    -   Add new providers in `src/providers/`.
    -   Update `src/core/router.js` to include them.
    -   Add tests in `tests/`.
4.  **Test**: Ensure everything works.
    ```bash
    npm test
    ```
5.  **Commit**: Write clear commit messages.
    ```bash
    git commit -m "Add Mistral provider support"
    ```
6.  **Push**: Push to your fork.
    ```bash
    git push origin feature/my-new-provider
    ```
7.  **Open a Pull Request**: Submit your PR on GitHub!

## Development Guidelines

-   **Code Style**: Follow standard JavaScript style.
-   **Testing**: Add unit tests for new features.
-   **Documentation**: Update README if you change public APIs.

We appreciate all contributions, big or small!
