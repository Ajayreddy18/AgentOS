import React, { Component } from "react";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export class AppErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Application Error:", error, info);
  }

  handleReload() {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="
                    flex
                    min-h-screen
                    flex-col
                    items-center
                    justify-center
                    gap-4
                    "
        >
          <h1
            className="
                        text-3xl
                        font-bold
                        "
          >
            Something went wrong
          </h1>

          <p
            className="
                        text-muted-foreground
                        "
          >
            An unexpected error occurred.
          </p>

          <button
            onClick={this.handleReload}
            className="
                        rounded-md
                        bg-black
                        px-4
                        py-2
                        text-white
                        "
          >
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
