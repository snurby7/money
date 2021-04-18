class NetworkService {
  private static instance: NetworkService;
  private constructor() {}

  public getInstance(): NetworkService {
    if (!NetworkService.instance) {
      NetworkService.instance = new NetworkService();
    }
    return NetworkService.instance;
  }
}
