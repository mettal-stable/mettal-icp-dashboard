import { TestIcpService } from "./services/test-icp.service";

export class IcpAdapter {
  async test() {
    const service = new TestIcpService();
    await service.execute();
  }
}
