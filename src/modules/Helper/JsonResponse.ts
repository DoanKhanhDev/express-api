class JsonResponse {
  private statusCode: number;
  private message: string;
  private data: any;

  private static messages: { [key: number]: string } = {
      200: 'OK',
      201: 'Resource Created',
      204: 'No Content',
      400: 'Invalid Request',
      401: 'Authentication Required',
      403: 'Access Denied',
      404: 'Resource Not Found',
      500: 'Server Error',
  };

  constructor() {
      this.statusCode = 200; // Default status code
      this.message = JsonResponse.messages[this.statusCode]; // Default message
      this.data = null; // Default data
  }

  setStatusCode(code: number): this {
      this.statusCode = code;
      this.message = JsonResponse.messages[code] || 'Unknown Status';
      return this;
  }

  setData(data: any): this {
      this.data = data;
      return this;
  }

  send() {
      return {
          statusCode: this.statusCode,
          message: this.message,
          data: this.data,
      };
  }
}

export default JsonResponse;
