import { DataSource, DataSourceOptions } from "typeorm";
import { ormconfig } from "../../../ormconfig";
import { error } from "console";

/**
 * The Connection interface. This inteface use type orm to connect DB(Mysql).
 */
export interface ConnectionInterface {
  /**
   * Create a connection to mysql.
   */
  getConnection(): DataSource;

  /**
   * Check the connect to mysql.
   */
  isConnection(): Boolean;
}

export default new (class Connection implements ConnectionInterface {
  private ormconfig: DataSourceOptions;
  protected dataSource: DataSource;

  /**
   * Create a constructor to create a datasource from typeorm.
   * And the ormconfig in root directory(ormconfig.ts).
   */
  constructor() {
    this.ormconfig = ormconfig;
    this.dataSource = new DataSource(this.ormconfig);
  }

  public getConnection(): DataSource {
    this.dataSource
      .initialize()
      .then(() => console.log("Connected"))
      .catch((error) => console.log(error));
    return this.dataSource;
  }

  public isConnection(): Boolean {
    return this.dataSource?.isInitialized ?? false;
  }
})();
