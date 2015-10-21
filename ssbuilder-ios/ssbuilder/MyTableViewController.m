//
//  MyTableViewController.m
//  ssbuilder
//
//  Created by Ruiheng Wang on 10/14/15.
//  Copyright © 2015 Ruiheng Wang. All rights reserved.
//

#import "MyTableViewController.h"

@interface MyTableViewController ()

@property NSMutableArray *nameList;
@property NSMutableArray *storyList;

@end

@implementation MyTableViewController

- (void)viewDidLoad {
    [super viewDidLoad];

}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    ///Dispose of any resources that can be recreated.
}

- (void) populateDataWithFirstItems: (NSMutableArray *) firstItems{

    self.nameList= firstItems;

}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    // Return the number of sections.
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    // Return the number of rows in the section.

    //switch (section) {
        //case 0:
            return self.nameList.count;
            //break;
       // default:
           // break;
    //}

    //return 0;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {

    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"Cell"];

    if (cell == nil) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:@"Cell"];
    }

    // Configure the cell...

//    switch (indexPath.section) {
//        case 0:{
//            NSArray *item = [self.nameList objectAtIndex:indexPath.row];
//            NSString *mainText = [item objectAtIndex:0];// i.e. "Juice"
//            cell.textLabel.text = mainText;
//            break;
//        }
//        default:
//            break;
//   }
    cell.textLabel.text = self.nameList[indexPath.row];

   return cell;
}

//- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
//    // Navigation logic may go here. Create and push another view controller.
//    MyTableViewController *detailViewController = [[MyTableViewController alloc] initWithStyle:UITableViewStyleGrouped];
//    detailViewController.details = self.storyList[indexPath.row];
//   [self.navigationController pushViewController:detailViewController animated:YES];
//}


@end

