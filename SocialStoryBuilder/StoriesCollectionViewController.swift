//
//  StoriesCollectionViewController.swift
//  SocialStoryBuilder
//
//  Created by Sonia Sen on 11/12/15.
//  Copyright © 2015 Sonia Sen. All rights reserved.
//

import UIKit

class StoriesCollectionViewController: UICollectionViewController {

    public var studentName: NSString?
    private let reuseIdentifier = "StoryCell"
    private let sectionInsets = UIEdgeInsets(top: 50.0, left: 35.0, bottom: 50.0, right: 35.0)
    private var jsonData: JSON?

    override func viewDidLoad() {
        super.viewDidLoad()

        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Register cell classes
        //self.collectionView!.registerClass(UICollectionViewCell.self, forCellWithReuseIdentifier: reuseIdentifier)

        // Do any additional setup after loading the view.
        let nameURL = studentName?.stringByReplacingOccurrencesOfString(" ", withString: "%20")
        
        let studentStoryUrlString = "http://localhost:3000/api/student-story/".stringByAppendingString(nameURL!)
        let studentStoryUrl = NSURL(string: studentStoryUrlString)
        
        let urlSession = NSURLSession.sharedSession()
        urlSession.dataTaskWithURL(studentStoryUrl!, completionHandler: { (data, response, error) -> Void in
            if (data?.length > 0 && error == nil){
                dispatch_async(dispatch_get_main_queue()) {
                    self.parseResponse(data!)
                }
            }
            else if (data?.length == 0 && error == nil){
                print("Empty response")
            }
            else if (error != nil){
                print("there was an error", error)
            }
        }).resume()
    }
    
    func parseResponse(responseData : NSData){
        
        jsonData = JSON(data: responseData)
        print("json story data: ", jsonData!)
        self.collectionView?.reloadData()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using [segue destinationViewController].
        // Pass the selected object to the new view controller.
    }
    */

    // MARK: UICollectionViewDataSource

    override func numberOfSectionsInCollectionView(collectionView: UICollectionView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }


    override func collectionView(collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of items
        if jsonData != nil{
            return jsonData!.count
        }
        else {
            return 1
        }
    }

    override func collectionView(collectionView: UICollectionView, cellForItemAtIndexPath indexPath: NSIndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCellWithReuseIdentifier(reuseIdentifier, forIndexPath: indexPath) as! StoryCollectionViewCell
    
        // Configure the cell
        cell.backgroundColor = UIColor.blackColor()
        if jsonData != nil{
            cell.storyTitleLabel.text = jsonData![indexPath.row]["title"].stringValue
            
            let panels = jsonData![indexPath.row]["panels"]
            print ("panels: ", panels[0]["url"])
            //cell.imageView.image = UIImage.set
            if let url = NSURL(string: panels[0]["url"].stringValue) {
                if let data = NSData(contentsOfURL: url) {
                    cell.imageView.image = UIImage(data: data)
                }        
            }
            
        }
    
        return cell
    }
    
    
    
    override func collectionView(collectionView: UICollectionView, didSelectItemAtIndexPath indexPath: NSIndexPath) {
        print("selected something...")
        
        let storyImagesVC = self.storyboard!.instantiateViewControllerWithIdentifier("StoryImageVC") as! StoryImageViewController
        storyImagesVC.panels = jsonData![indexPath.row]["panels"]
        self.navigationController?.pushViewController(storyImagesVC, animated: true)
    }

    // MARK: UICollectionViewDelegate

    /*
    // Uncomment this method to specify if the specified item should be highlighted during tracking
    override func collectionView(collectionView: UICollectionView, shouldHighlightItemAtIndexPath indexPath: NSIndexPath) -> Bool {
        return true
    }
    */

    /*
    // Uncomment this method to specify if the specified item should be selected
    override func collectionView(collectionView: UICollectionView, shouldSelectItemAtIndexPath indexPath: NSIndexPath) -> Bool {
        return true
    }
    */

    /*
    // Uncomment these methods to specify if an action menu should be displayed for the specified item, and react to actions performed on the item
    override func collectionView(collectionView: UICollectionView, shouldShowMenuForItemAtIndexPath indexPath: NSIndexPath) -> Bool {
        return false
    }

    override func collectionView(collectionView: UICollectionView, canPerformAction action: Selector, forItemAtIndexPath indexPath: NSIndexPath, withSender sender: AnyObject?) -> Bool {
        return false
    }

    override func collectionView(collectionView: UICollectionView, performAction action: Selector, forItemAtIndexPath indexPath: NSIndexPath, withSender sender: AnyObject?) {
    
    }
    */
    
    func collectionView(collectionView : UICollectionView,layout collectionViewLayout:UICollectionViewLayout,sizeForItemAtIndexPath indexPath:NSIndexPath) -> CGSize
    {
        return CGSizeMake(332, 316)
    }
    
    func collectionView(collectionView: UICollectionView,
        layout collectionViewLayout: UICollectionViewLayout,
        insetForSectionAtIndex section: Int) -> UIEdgeInsets {
            return sectionInsets
    }

}
